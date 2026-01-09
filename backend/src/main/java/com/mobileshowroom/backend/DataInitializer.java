package com.mobileshowroom.backend;

import com.mobileshowroom.backend.entity.ERole;
import com.mobileshowroom.backend.entity.Role;
import com.mobileshowroom.backend.entity.Category;
import com.mobileshowroom.backend.entity.Product;
import com.mobileshowroom.backend.repository.RoleRepository;
import com.mobileshowroom.backend.repository.CategoryRepository;
import com.mobileshowroom.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialize Roles
        if (roleRepository.count() == 0) {
            roleRepository.save(new Role(ERole.ROLE_USER));
            roleRepository.save(new Role(ERole.ROLE_MODERATOR));
            roleRepository.save(new Role(ERole.ROLE_ADMIN));
        }

        // Initialize Categories and Products
        if (categoryRepository.count() == 0) {
            Category phones = new Category();
            phones.setName("Smartphones");
            phones.setDescription("Latest mobile phones from top brands");
            phones = categoryRepository.save(phones);

            Category laptops = new Category();
            laptops.setName("Laptops");
            laptops.setDescription("High-performance laptops for work and play");
            laptops = categoryRepository.save(laptops);

            // Add sample Phones
            Product iphone = new Product();
            iphone.setName("iPhone 15 Pro");
            iphone.setDescription("Apple iPhone 15 Pro with Titanium design and A17 Pro chip");
            iphone.setPrice(new BigDecimal("99900.00"));
            iphone.setStockQuantity(50);
            iphone.setCategory(phones);
            iphone.setImageUrl("https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=2070&auto=format&fit=crop");
            productRepository.save(iphone);

            Product s24 = new Product();
            s24.setName("Samsung Galaxy S24 Ultra");
            s24.setDescription("Samsung's flagship with Galaxy AI and 200MP camera");
            s24.setPrice(new BigDecimal("129900.00"));
            s24.setStockQuantity(30);
            s24.setCategory(phones);
            s24.setImageUrl("https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=2070&auto=format&fit=crop");
            productRepository.save(s24);

            // Add sample Laptops
            Product macbook = new Product();
            macbook.setName("MacBook Air M3");
            macbook.setDescription("Thin and light laptop with M3 chip for incredible performance");
            macbook.setPrice(new BigDecimal("114900.00"));
            macbook.setStockQuantity(20);
            macbook.setCategory(laptops);
            macbook.setImageUrl("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926&auto=format&fit=crop");
            productRepository.save(macbook);

            Product dell = new Product();
            dell.setName("Dell XPS 13");
            dell.setDescription("Premium 13-inch laptop with stunning InfinityEdge display");
            dell.setPrice(new BigDecimal("135000.00"));
            dell.setStockQuantity(15);
            dell.setCategory(laptops);
            dell.setImageUrl("https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2063&auto=format&fit=crop");
            productRepository.save(dell);
        }
    }
}
