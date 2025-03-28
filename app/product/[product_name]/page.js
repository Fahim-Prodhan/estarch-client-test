'use client'
import { useContext, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/slices/cartSlice";
import { openSize } from "@/lib/slices/sizeSlice";
import { FaWhatsapp } from "react-icons/fa";
import { PiCoatHanger } from 'react-icons/pi';
import { openCardSlide } from "@/lib/slices/cardSlideSlice";
import SizeChart from "@/components/sizes/page";
import ProductCard from "@/components/productLike/page";
import RelatedProductsSinglePage from "@/components/RelatedProducts/page";
import ContactCard from "@/components/WishlistPhone/page";
import parse from 'html-react-parser';
import baseUrl from "@/components/services/baseUrl";
import { motion } from "framer-motion";
import './magnifier.css'
import { AuthContext } from "@/components/context/AuthProvider";
import ImageModal from "@/components/zoomedImageModal/ImageModal";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [warning, setWarning] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const { product_name } = useParams();
  const searchParams = useSearchParams();
  const sku = searchParams.get("sku");
  const router = useRouter();
  const [zoomLevel, setZoomLevel] = useState(3); // Zoom level for magnifier
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 }); // Position of the magnifier lens
  const [showLens, setShowLens] = useState(false); // Show/hide magnifier lens
  const [url, setUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { setGlobalLoading } = useContext(AuthContext);

  // const Controls = () => {
  //   const { zoomIn, zoomOut, resetTransform } = useControls();
  //   return (
  //     <div className="flex gap-4">
  //       <button onClick={() => zoomIn()}>+</button>
  //       <button onClick={() => zoomOut()}>-</button>
  //       <button onClick={() => resetTransform()}>Reset</button>
  //     </div>
  //   );
  // };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setGlobalLoading(true)
      try {
        const response = await axios.get(`${baseUrl}/api/products/products/product-details/${encodeURIComponent(product_name)}/${sku}`);
        setProduct(response.data);
        setMainImage(response.data?.images[0]);
        setGlobalLoading(false)
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    if (sku) {
      fetchProduct();
    }
  }, [product_name, sku]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (!product || !product_name || !sku) return;

    // Clear the previous ecommerce object
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ecommerce: null });

    // Push the product view event to the dataLayer
    window.dataLayer.push({
      event: "view_item",
      ecommerce: {
        currency: "BDT",
        value: product.salePrice || 0,
        items: [{
          item_id: product.SKU || "undefined",
          item_name: product.productName || "undefined",
          discount: product.discount || 0,
          index: 0,
          item_brand: product.selectedBrand || "Brand Unknown",
          item_category: product.selectedCategoryName || "Category Unknown",
          price: product.salePrice || 0,
          quantity: 1,
        }]
      }
    });
  }, [product, product_name, sku]);

  const handleAddToCart = () => {
    if (selectedSize) {
      setWarning(false);
      dispatch(openCardSlide());
      dispatch(addToCart({
        id: product?._id,
        product: {
          sku: product?.SKU,
          discount: product?.discount?.amount,
          title: product?.productName,
          price: product?.salePrice,
          colors: [{ images: [{ url: mainImage }] }],
          stock: { quantity: 10 }, // Adjust based on actual product details
        },
        quantity,
        color: 'Blue', // Add actual color if available
        size: selectedSize,
      }));
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ ecommerce: null });

      window.dataLayer.push({
        event: "add_to_cart",
        ecommerce: {
          currency: "BDT",
          value: product.salePrice || 0,
          items: [{
            item_id: product.SKU || "undefined",
            item_name: product.productName || "undefined",
            discount: product.discount || 0,
            index: 0,
            item_brand: product.selectedBrand || "Brand Unknown",
            item_category: product.selectedCategoryName || "Category Unknown",
            price: product.salePrice || 0,
            quantity: 1,
          }]
        }
      });
    } else {
      setWarning(true);
    }
  };

  const buyNowButton = () => {
    if (selectedSize) {
      router.push(`/product/order/${product?._id}/${selectedSize}?q=${quantity}`);
    } else {
      setWarning(true);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleThumbnailClick = (imgSrc) => {
    setMainImage(imgSrc);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleShare = () => {
    if (selectedSize) {
      const phoneNumber = "8801781813939"; // Replace with the recipient's phone number in international format
      const productName = product?.productName;
      const price = product?.regularPrice > product?.salePrice ? product?.salePrice : product?.regularPrice;
      const currentUrl = window.location.href;
      const message = `Hello. I want to buy this product:\n\n${productName}\nPrice: ${price} \nSize: ${selectedSize}\nURL: ${currentUrl}`;

      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, "_blank");
    } else {
      setWarning(true);
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const mouseX = e.pageX - left; // Mouse X position relative to the image
    const mouseY = e.pageY - top; // Mouse Y position relative to the image

    // Calculate the background position to center the lens on the mouse pointer
    const lensWidth = 250; // Width of the lens
    const lensHeight = 250; // Height of the lens
    const bgX = (mouseX / width) * 100; // X position in percentage
    const bgY = (mouseY / height) * 100; // Y position in percentage

    // Offset the background position to center the lens on the mouse pointer
    const offsetX = (lensWidth / width) * -10; // Half of the lens width in percentage
    const offsetY = (lensHeight / height) * 70; // Half of the lens height in percentage

    setLensPosition({
      x: bgX - offsetX,
      y: bgY - offsetY,
    });
    setShowLens(true);
  };

  const handleMouseLeave = () => {
    setShowLens(false);
  };

  const toSentenceCase = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const cleanHtml = (html) => {
    if (!html) return '';
    const withoutStyle = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    const withoutHtml = withoutStyle.replace(/<\/?[^>]+(>|$)/g, '');
    return withoutHtml.replace(/\s+/g, ' ').trim();
  };

  const SkeletonLoader = () => (
    <div
      className="min-w-full bg-gray-300 rounded-lg animate-pulse md:min-h-[550px] min-h-[400px]"
    ></div>
  );

  return (
    <>
      <head>
        <meta property="og:title" content={toSentenceCase(product?.productName || '')} />
        <meta property="og:description" content={cleanHtml(product?.content)} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${baseUrl}/${product?.images[0]} `} />
        <meta property="product:availability" content="in stock" />
        <meta property="product:condition" content="new" />
        <meta property="product:price:amount" content={`${product?.salePrice}`} />
        <meta property="product:price:currency" content="BDT" />
        <meta property="product:retailer_item_id" content={product?.SKU} />
      </head>
      <div className="container mx-auto p-4">
        <div className="breadcrumbs text-xs md:text-sm md:my-6 my-3 md:pl-8 pl-2">
          <ul>
            <li><Link className="uppercase" href={'/'}>Home</Link></li>
            <li><Link className="uppercase" href={`/${product?.selectedType}`}>{product?.selectedType}</Link></li>
            <li><Link href={`/${product?.selectedType}/${product?.selectedCategoryName}`} className="uppercase ">{product?.selectedCategoryName}</Link></li>
            <li><Link href={`/${product?.selectedType}/${product?.selectedCategoryName}/${product?.selectedSubCategory}`} className="uppercase ">{product?.selectedSubCategory}</Link></li>
            <li><Link href={`/product/${product?._id}`} className="uppercase font-bold">{product?.productName}</Link></li>
          </ul>
        </div>
        <div className="flex flex-col md:flex-row justify-center">
          <div className="flex flex-col md:flex-row w-full md:w-2/3 border rounded-lg p-4 relative">
            <div className="w-full md:w-1/2 min-h-96">
              <div className="magnifier-container hidden lg:block" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                {!mainImage ? (
                  <SkeletonLoader />
                ) : (
                  <motion.img
                    key={mainImage}
                    width={500}
                    height={500}
                    src={`${baseUrl}/${mainImage}`}
                    alt={product?.productName || "Product Image"}
                    className="magnifier-image"
                    style={{
                      transform: showLens
                        ? `scale(${zoomLevel}) translate(-${lensPosition.x}%, -${lensPosition.y}%)`
                        : 'scale(1)',
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />

                )}
                {showLens && (
                  <div
                    className="magnifier-lens"
                    style={{
                      backgroundImage: `url(${baseUrl}/${mainImage})`,
                      backgroundPosition: `${lensPosition.x}% ${lensPosition.y}%`,
                      backgroundSize: `${zoomLevel * 100}%`,
                    }}
                  />
                )}
              </div>

              <div className="lg:hidden block">
                {!mainImage ? (
                  <SkeletonLoader />
                ) : (
                  <>
                    <motion.img
                      key={mainImage}
                      width={500}
                      height={500}
                      src={`${baseUrl}/${mainImage}`}
                      alt={product?.productName || "Product Image"}
                      className="magnifier-image cursor-pointer"
                      onClick={() => handleImageClick(0)} // Open modal with the first image
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                    {showLens && (
                      <div
                        className="magnifier-lens"
                        style={{
                          backgroundImage: `url(${baseUrl}/${mainImage})`,
                          backgroundPosition: `${lensPosition.x}% ${lensPosition.y}%`,
                          backgroundSize: `${zoomLevel * 100}%`,
                        }}
                      />
                    )}
                  </>
                )}
              </div>
              <div className="flex mt-2 gap-2">
                {product?.images && product?.images.map((img, index) => (
                  <Image
                    key={index}
                    width={120}
                    height={120}
                    src={`${baseUrl}/${img}`}
                    alt={product?.productName}
                    className="w-20 h-30 md:w-30 md:h-30 lg:w-30 lg:h-30 object-cover cursor-pointer"
                    onClick={() => handleThumbnailClick(img)}
                  />
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2  lg:p-4">
              <h1 className="lg:text-2xl font-bold">{product?.productName}</h1>
              <p className="text-sm text-gray-600 ">SKU: {product?.SKU}</p>
              <p className="text-red-600 text-xl font-semibold">
                {product?.regularPrice === product?.salePrice ? (
                  <span>৳ {product?.regularPrice}</span>
                ) : (
                  <>
                    <span
                      className="line-through font-normal text-gray-500 mr-2"
                      style={{ fontSize: "0.8em" }}
                    >
                      ৳ {product?.regularPrice}
                    </span>
                    ৳ {product?.salePrice}
                  </>
                )}
              </p>

              <div className="flex gap-1 items-center">
                <p className="text-sm font-bold">Select Size :</p>
                <div className='w-48 h-[40px] rounded-md flex justify-between '>
                  <p className="flex gap-2 items-center cursor-pointer " onClick={() => dispatch(openSize(product?.charts))}>
                    (<PiCoatHanger /> <span className="text-blue-500">Size guide</span> )
                  </p>
                </div>
              </div>

              <div className="flex mb-4">
                {product?.sizeDetails && product?.sizeDetails?.map(size => (

                  <button
                    key={size.size}
                    disabled={!size.available}
                    className={`border px-[14px] py-[2px] ${!size.available ? 'bg-gray-300 ' : ''}    mr-2 ${selectedSize === size.size ? 'bg-black text-white' : ''}`}
                    onClick={() => { handleSizeClick(size.size), setWarning(false) }}
                  >
                    {size?.size}

                  </button>
                ))}
              </div>
              {
                warning && <h1 className='text-red-500'>Please select a size</h1>

              }
              <div className="flex flex-row gap-2  items-center">
                <p className="text-sm font-bold mb-2">Quantity:</p>
                <div className="flex items-center ">
                  <button
                    className="border px-3 h-8"
                    onClick={decrementQuantity}
                  >
                    -
                  </button>
                  <p className="mx-4">{quantity}</p>
                  <button
                    className="border px-3 h-8"
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mt-5 mb-4">
                <div onClick={handleAddToCart} className="flex-1 sm:flex-initial">
                  <button
                    className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2"
                  >
                    Add to cart
                  </button>
                </div>

                <div className="flex-1 sm:flex-initial">
                  <button onClick={buyNowButton} className="w-full sm:w-auto bg-black text-white px-4 py-2">
                    Order now
                  </button>
                </div>

                {/* <div className="flex-1 sm:flex-initial">
                  <button onClick={handleShare}
                    className="w-full sm:w-auto flex justify-center items-center text-white px-4 py-2"
                    style={{ backgroundColor: 'rgb(30, 170, 72)' }}
                  >
                    <span className="mr-2"><FaWhatsapp size={25} /></span> Whatsapp
                  </button>
                </div> */}
              </div>
              <div className="divider"></div>
              <ContactCard />
              <div className="divider"></div>
              <SizeChart charts={product?.charts} />

              <div className="hidden md:block lg:block">
                <div className="w-full max-w-4xl mx-auto mt-8">
                  <div className="flex border-b border-gray-200">
                    <button
                      className={`text-lg font-semibold px-4 py-2 focus:outline-none ${activeTab === 'description'
                        ? 'text-black border-b-2 border-yellow-600'
                        : 'text-gray-500'
                        }`}
                      onClick={() => setActiveTab('description')}
                    >
                      DESCRIPTION
                    </button>
                    <button
                      className={`text-lg font-semibold px-4 py-2 focus:outline-none ${activeTab === 'delivery'
                        ? 'text-black border-b-2 border-yellow-600'
                        : 'text-gray-500'
                        }`}
                      onClick={() => setActiveTab('delivery')}
                    >
                      Guide Line
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="mt-4">
                    {activeTab === 'description' && (
                      <div>{product?.content ? <p>{parse(product?.content)}</p> : <p>No content available.</p>}</div>
                    )}

                    {activeTab === 'delivery' && (
                      <div> {product?.guideContent ? <p>{parse(product?.guideContent)}</p> : <p>No content available.</p>}</div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="border-t pt-4 bg-gray-200 rounded-lg mt-4 md:mt-0 md:ml-4">
            <div className="mx-8">
              <h2 className="text-lg font-bold mb-2">Delivery Charge</h2>
              <p className="text-sm mb-2">
                <span className="mr-2">🚚</span>Dhaka City: 60 TK (2-3 Days)
              </p>
              <p className="text-sm mb-2">
                <span className="mr-2">🚚</span>Outside Dhaka: 120 TK (3-5 Days)
              </p>
              <h2 className="text-lg font-bold mt-4 mb-2">Payment</h2>
              <p className="text-sm mb-2">
                <span className="mr-2">💳</span>Cash on Delivery: Available
              </p>
            </div>
          </div>
        </div>
        <div className="lg:hidden">
          <div className="w-full max-w-4xl mx-auto mt-8">
            <div className="flex border-b border-gray-200">
              <button
                className={`text-lg font-semibold px-4 py-2 focus:outline-none ${activeTab === 'description'
                  ? 'text-black border-b-2 border-yellow-600'
                  : 'text-gray-500'
                  }`}
                onClick={() => setActiveTab('description')}
              >
                DESCRIPTION
              </button>
              <button
                className={`text-lg font-semibold px-4 py-2 focus:outline-none ${activeTab === 'delivery'
                  ? 'text-black border-b-2 border-yellow-600'
                  : 'text-gray-500'
                  }`}
                onClick={() => setActiveTab('delivery')}
              >
                Guide Line
              </button>
            </div>

            {/* Tab Content */}
            <div className="mt-4">
              {activeTab === 'description' && (

                <div> {product?.content ? <p>{parse(product?.content)}</p> : <p>No content available.</p>}</div>

              )}

              {activeTab === 'delivery' && (
                <div> {product?.guideContent ? <p>{parse(product?.guideContent)}</p> : <p>No content available.</p>}</div>

              )}
            </div>
          </div>
        </div>
        <div className="text-center  pt-6 lg:pt-12">
          <h1 className="text center">Related Products</h1>
        </div>
        <div className="lg:mx-20 grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {product?.relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct?._id} product={relatedProduct?.product} />
          ))}
        </div>

        <RelatedProductsSinglePage />
        <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={product?.images || []}
        initialIndex={selectedImageIndex}
      />
      </div>
    </>

  );
};

export default ProductDetails;