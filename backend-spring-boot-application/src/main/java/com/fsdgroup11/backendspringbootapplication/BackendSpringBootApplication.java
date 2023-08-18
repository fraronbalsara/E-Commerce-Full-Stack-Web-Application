// Fraron Balsara

package com.fsdgroup11.backendspringbootapplication;

import com.fsdgroup11.backendspringbootapplication.model.*;
import com.fsdgroup11.backendspringbootapplication.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.Timestamp;

@SpringBootApplication
public class BackendSpringBootApplication implements CommandLineRunner {

	@Autowired
	AdminCredentialsRepository adminCredentialsRepository;

	@Autowired
	SellerCredentialsRepository sellerCredentialsRepository;

	@Autowired
	SellerRepository sellerRepository;

	@Autowired
	CustomerCredentialsRepository customerCredentialsRepository;

	@Autowired
	CustomerRepository customerRepository;

	@Autowired
	ProductRepository productRepository;

	public static void main(String[] args) {
		SpringApplication.run(BackendSpringBootApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		// Inserting one admin record
		AdminCredentials firstAdminCredentials = new AdminCredentials(1, "default.admin@email.com", "DefaultAdmin@1");
		adminCredentialsRepository.save(firstAdminCredentials);

		// Inserting one seller record
		SellerCredentials firstSellerCredentials = new SellerCredentials(1, "default.seller@email.com", "DefaultSeller@1");
		Seller firstSeller = new Seller(1, "Default Seller", "12-A, Akruti Apartments, Swati Park Road, Rajkot 360004, Gujarat, India", "default.seller@email.com", Timestamp.valueOf("2023-07-19 14:00:00"),null ,"9927727281");
		sellerCredentialsRepository.save(firstSellerCredentials);
		sellerRepository.save(firstSeller);

		// Inserting one customer record
		CustomerCredentials firstCustomerCredentials = new CustomerCredentials(1, "default.customer@email.com", "DefaultCustomer@1");
		Customer firstCustomer = new Customer(1, "Default Customer", "701-B, High Spring Towers, J. N. Road, Mumbai 400015, Maharashtra, India", "default.customer@email.com", Timestamp.valueOf("2023-07-19 14:00:00"),null ,"9873632416");
		customerCredentialsRepository.save(firstCustomerCredentials);
		customerRepository.save(firstCustomer);

		// Inserting few products
		Product firstProduct = new Product(1, "OCO Perfume", "Lavender Perfume (50ml)", "Premium OCO Perfume from OCO's elite collection. (Perfume is used to give a pleasant and desirable scent to a person's body with the aim of increasing self appeal and self confidence)",
				1700, Timestamp.valueOf("2023-07-19 14:00:00"), null, 10000, "300gms", "86.5mm x 41mm x 25mm",
				Product.Category.Health, Product.SubCategory.Cosmetics, "Lavender",
				"/ProductImages/perfume.jpg", "default.seller@email.com");
		Product secondProduct = new Product(2, "Max Think book Laptop", "Windows 11 Laptop", "11th Gen Intel Core i5, 2.4Ghz, DDR4, 8GB RAM, 1TB SSD, Display 15.6 inches (39.62 cm) FHD, 1920x1080 pixels, Average Battery Life of 6 hours.",
				85000, Timestamp.valueOf("2023-07-19 14:00:00"), null, 7000, "1.7kgs", "35.7x23.5x1.9 cm",
				Product.Category.Electronics, Product.SubCategory.Laptop, "Silver",
				"/ProductImages/laptop.jpg", "default.seller@email.com");
		Product thirdProduct = new Product(3, "Max Mobile", "Android Mobile", "This ia an Android mobile running Android 12 OS. 12 GB RAM, 256 GB Storage. 5600 mAh battery. 6.5 inch display. 30 megapixel back camera and 10 megapixel front camera, Screen Resolution 2208x1768. Adreno 660 Graphics Processor. Qualcom Snapdragon 880. 5G enabled",
				55000, Timestamp.valueOf("2023-07-19 14:00:00"), null, 4500, "252gms", "151x67x14 mm",
				Product.Category.Electronics, Product.SubCategory.Mobile, "Phantom Black",
				"/ProductImages/blackMobile.jpg", "default.seller@email.com");
		Product fourthProduct = new Product(4, "Sun - Orange Aviators", "Orange Aviator Sunglasses", "Stylish sunglasses. Comfortable yet light with no compromise on durability. 100% UV Protection",
				1799, Timestamp.valueOf("2023-07-19 14:00:00"), null, 10000, "32gms", "145mm x 133mm x 45mm",
				Product.Category.Clothing, Product.SubCategory.Sunglasses, "Orange Aviators",
				"/ProductImages/orangeSunglasses.jpg", "default.seller@email.com");
		Product fifthProduct = new Product(5, "Sun - Blue Sunglasses", "Blue Stylish Sunglasses", "Stylish sunglasses. Comfortable yet light with no compromise on durability. 100% UV Protection",
				1599, Timestamp.valueOf("2023-07-19 14:00:00"), null, 7500, "35gms", "141.5mm x 129mm x 46mm",
				Product.Category.Clothing, Product.SubCategory.Sunglasses, "Blue Sunglasses",
				"/ProductImages/blueSunglasses.jpg", "default.seller@email.com");
		Product sixthProduct = new Product(6, "Canvas Paper", "Canvas Paper Type A",
				"Canvas heavyweight paper with a textured, coated surface. Designed with precision to evenly absorbs oil, bonding agents and water.",
				2500, Timestamp.valueOf("2023-07-19 14:00:00"), null, 100, "700gms", "94.2cm x 107.3cm x 137.1cm",
				Product.Category.Stationary, Product.SubCategory.Paper, "Type A",
				"/ProductImages/canvasPaper.jpg", "default.seller@email.com");
		Product seventhProduct = new Product(7, "Lokme Nail Polish",
				"Nail Polish/Nail Enamel is a lacquer that can be applied to finger nails", "Long lasting nail polish with intense shine. It provides a pleasing look and addresses nail plate conditions like soft nails or brittle nails.",
				499, Timestamp.valueOf("2023-07-19 14:00:00"), null, 700, "51 gms", "35mm x 18mm x 18mm",
				Product.Category.Health, Product.SubCategory.Cosmetics, "Pink",
				"/ProductImages/pinkNailPolish.jpg", "default.seller@email.com");
		Product eighthProduct = new Product(8, "Max Headphones Bass Plus", "On the ear bluetooth headphones.", "Foldable with Bluetooth v5.0, 40mm Dynamic Drivers, 300mAh battery that provides up to 8 hours of audio.",
				3699, Timestamp.valueOf("2023-07-19 14:00:00"), null, 1500, "0.5mg", "6.7 x 6.7 x 3.5 inches",
				Product.Category.Electronics, Product.SubCategory.Earphones, "Black",
				"/ProductImages/blackHeadphones.jpg", "default.seller@email.com");
		Product ninthProduct = new Product(9, "Tracks Denims", "Pack of three blue Tracks denims",
				"Slim fit stretch denims with sturdy cotton warp-faced textile. Features 4 pockets and unique designs. Indigo Blue Color.",
				2299, Timestamp.valueOf("2023-07-19 14:00:00"), null, 3000, "365 gms x 3", "36 x 34 inches",
				Product.Category.Clothing, Product.SubCategory.Trousers, "Medium",
				"/ProductImages/threeJeans.jpg", "default.seller@email.com");
		productRepository.save(firstProduct);
		productRepository.save(secondProduct);
		productRepository.save(thirdProduct);
		productRepository.save(fourthProduct);
		productRepository.save(fifthProduct);
		productRepository.save(sixthProduct);
		productRepository.save(seventhProduct);
		productRepository.save(eighthProduct);
		productRepository.save(ninthProduct);
	}
}
