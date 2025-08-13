import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  addMultipleImage,
  addProduct,
  fetchAllCategories,
} from "../../lib/api";

export const ProductCreationForm = () => {
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    product_price: "",
    category_id: "",
    inventory: {
      quantity: "",
      quantity_on_stock: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [productType, setProductType] = useState("");
  const [bookAttributes, setBookAttributes] = useState({
    book_title: "",
    book_pages: "",
    publish_date: "",
  });
  const [clothingAttributes, setClothingAttributes] = useState({
    clothing_size: "",
    clothing_color: "",
    clothing_material: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
    staleTime: Infinity,
  });

  // Auto-select category when product type changes
  useEffect(() => {
    if (categories && categories.length > 0) {
      const matchingCategory = categories.find(
        (category) =>
          category.category_name.toLowerCase() === productType.toLowerCase(),
      );

      if (matchingCategory) {
        setFormData((prev) => ({
          ...prev,
          category_id: matchingCategory.categoryId,
        }));
      } else {
        // If no matching category found, clear the selection
        setFormData((prev) => ({
          ...prev,
          category_id: "",
        }));
      }

      // Set default productType to the first category if not set
      if (!productType && categories.length > 0) {
        setProductType(categories[0].category_name);
      }
    }
  }, [productType, categories]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity" || name === "quantity_on_stock") {
      setFormData((prev) => ({
        ...prev,
        inventory: {
          ...prev.inventory,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleProductTypeChange = (e) => {
    setProductType(e.target.value);
  };

  const handleBookAttributeChange = (e) => {
    const { name, value } = e.target;
    setBookAttributes((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClothingAttributeChange = (e) => {
    const { name, value } = e.target;
    setClothingAttributes((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate: AddProduct } = useMutation({
    mutationFn: addProduct,
  });
  const { mutate: AddImage } = useMutation({
    mutationFn: addMultipleImage,
    onSuccess: (data) => {
      console.log("Images uploaded successfully:", data);
    },
    onError: (error) => {
      console.error("Error uploading images:", error);
      setError("Failed to upload images");
      setLoading(false);
    },
  });

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (selectedImages.length + files.length > 10) {
      setError("Just upload maximum 10 images");
      return;
    }
    setSelectedImages((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageURLs((prev) => [...prev, e.target?.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImageURLs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.category_id) {
      setError("Please select a valid category for the product type");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let uploadedImageUrls = [];
      if (selectedImages.length > 0) {
        const { data } = await new Promise((resolve, reject) => {
          console.log("Image file: ", selectedImages)
          AddImage(selectedImages, {
            onSuccess: (imageResponse) => {
              setLoading(false);
              setSuccess("Product and images created successfully!");
              // resetForm();
              resolve(imageResponse);
            },
            onError: (error) => {
              console.error("Error uploading images:", error);
              setError("Failed to upload images");
              setLoading(false);
            },
          });
        });
        uploadedImageUrls = data;
      } else {
        setTimeout(() => {
          setLoading(false);
          setSuccess("Product created successfully!");
        }, 2000);
      }

      // Prepare product data
      const productData = {
        ...formData,
        img_url: uploadedImageUrls,
        ...(productType.toLowerCase() === "book"
          ? {
            book_attributes: {
              book_title: formData.product_name,
              book_pages: Number(bookAttributes.book_pages),
              publish_date: bookAttributes.publish_date,
            },
          }
          : {
            clothing_attributes: {
              clothing_size: clothingAttributes.clothing_size,
              clothing_color: clothingAttributes.clothing_color,
              clothing_material: clothingAttributes.clothing_material,
            },
          }),
      };

      console.log("Product data:", productData);
      console.log("Selected category ID:", formData.category_id);

      AddProduct(productData, {
        onSuccess: (productResponse) => {
          console.log(productResponse);
          // Upload images if any selected
        },
      });
    } catch (error) {
      console.error("Error creating product:", error);
      setError("Failed to create product");
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      product_name: "",
      description: "",
      product_price: "",
      category_id: "",
      inventory: { quantity: "", quantity_on_stock: "" },
    });
    setBookAttributes({
      book_title: "",
      book_pages: "",
      publish_date: "",
    });
    setClothingAttributes({
      clothing_size: "",
      clothing_color: "",
      clothing_material: "",
    });
    setSelectedImages([]);
    setImageURLs([]);
    setProductType(categories?.[0]?.category_name || "");
  };

  // Get current selected category info
  const selectedCategory = categories?.find(
    (cat) => cat.categoryId === formData.category_id,
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Create New Product
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {categoriesError && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Failed to load categories: {categoriesError.message}
        </div>
      )}

      <div className="space-y-6">
        {/* Basic Product Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="product_name"
              value={formData.product_name}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Price
            </label>
            <input
              type="number"
              name="product_price"
              value={formData.product_price}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Type & Category
            </label>

            {/* Product Type Selection */}
            <select
              value={productType}
              onChange={handleProductTypeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            >
              {categoriesLoading ? (
                <option value="">Loading categories...</option>
              ) : categories && categories.length > 0 ? (
                categories.map((category) => (
                  <option
                    key={category.categoryId}
                    value={category.category_name}
                  >
                    {category.category_name}
                  </option>
                ))
              ) : (
                <option value="">No categories available</option>
              )}
            </select>
          </div>
        </div>

        {/* Rest of the form remains unchanged */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.inventory.quantity}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity on Stock
            </label>
            <input
              type="number"
              name="quantity_on_stock"
              value={formData.inventory.quantity_on_stock}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Book Attributes */}
        {productType.toLowerCase() === "book" && (
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Book Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Book Title
                </label>
                <input
                  type="text"
                  name="book_title"
                  value={bookAttributes.book_title}
                  onChange={handleBookAttributeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pages
                </label>
                <input
                  type="number"
                  name="book_pages"
                  value={bookAttributes.book_pages}
                  onChange={handleBookAttributeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publish Date
                </label>
                <input
                  type="date"
                  name="publish_date"
                  value={bookAttributes.publish_date}
                  onChange={handleBookAttributeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Clothing Attributes */}
        {productType.toLowerCase() === "clothing" && (
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Clothing Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <select
                  name="clothing_size"
                  value={clothingAttributes.clothing_size}
                  onChange={handleClothingAttributeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Size</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <input
                  type="text"
                  name="clothing_color"
                  value={clothingAttributes.clothing_color}
                  onChange={handleClothingAttributeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Material
                </label>
                <input
                  type="text"
                  name="clothing_material"
                  value={clothingAttributes.clothing_material}
                  onChange={handleClothingAttributeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Image Upload */}
        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Images (Max 10)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageSelect}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {imageURLs.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {imageURLs.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Product ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="border-t pt-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !formData.category_id || categoriesLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Creating Product..."
              : !formData.category_id
                ? "Select Product Type First"
                : "Create Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCreationForm;
