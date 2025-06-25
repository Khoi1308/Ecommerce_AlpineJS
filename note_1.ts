async createProduct(productData: CreateProductDto, imageFiles ?: Express.Multer.File[]): Promise < Product > {
  let imageUrls: string[] = [];

  // Upload ảnh lên Cloudinary nếu có
  if(imageFiles && imageFiles.length > 0) {
  const filePaths = imageFiles.map(file => file.path);
  try {
    imageUrls = await uploadMultipleImages(filePaths, 'products');
  } catch (error) {
    imageFiles.forEach(file => fs.unlinkSync(file.path)); // Xóa file tạm nếu upload thất bại
    throw error;
  }
  imageFiles.forEach(file => fs.unlinkSync(file.path)); // Xóa file tạm sau khi upload thành công
}

// Validation
if (!productData.product_name || !productData.product_price) {
  throw new Error('Product name and price are required');
}

// Tạo product theo type
let product: Product | Book | Clothing;

switch (productData.product_type) {
  case 'book':
    if (!productData.author) {
      throw new Error('Author is required for book');
    }
    product = this.bookRepository.create({
      ...productData,
      img_url: imageUrls,
      author: productData.author,
    } as any); // Ép kiểu tạm thời để tránh lỗi TypeScript
    break;

  case 'clothing':
    if (!productData.clothing_size) {
      throw new Error('Clothing size is required for clothing');
    }
    product = this.clothingRepository.create({
      ...productData,
      img_url: imageUrls,
      clothing_size: productData.clothing_size,
    } as any);
    break;

  default:
    product = this.productRepository.create({
      ...productData,
      img_url: imageUrls,
    } as any);
    break;
}

return await this.productRepository.save(product);
  }
