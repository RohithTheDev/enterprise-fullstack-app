package com.mobileshowroom.backend.controllers;

import java.util.List;
import java.util.Optional;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.mobileshowroom.backend.entity.Product;
import com.mobileshowroom.backend.entity.Category;
import com.mobileshowroom.backend.repository.ProductRepository;
import com.mobileshowroom.backend.repository.CategoryRepository;
import com.mobileshowroom.backend.payload.response.MessageResponse;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping
    public List<Product> getAllProducts(@RequestParam(required = false) String name) {
        if (name != null) {
            return productRepository.findByNameContainingIgnoreCase(name);
        }
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            return ResponseEntity.ok(product.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/category/{categoryId}")
    public List<Product> getProductsByCategory(@PathVariable Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createProduct(@Valid @RequestBody Product product) {
        if (product.getCategory() != null && product.getCategory().getId() != null) {
             Optional<Category> category = categoryRepository.findById(product.getCategory().getId());
             if (category.isPresent()) {
                 product.setCategory(category.get());
             }
        }
        productRepository.save(product);
        return ResponseEntity.ok(new MessageResponse("Product created successfully!"));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @Valid @RequestBody Product productRequest) {
        Optional<Product> productData = productRepository.findById(id);

        if (productData.isPresent()) {
            Product product = productData.get();
            product.setName(productRequest.getName());
            product.setDescription(productRequest.getDescription());
            product.setPrice(productRequest.getPrice());
            product.setStockQuantity(productRequest.getStockQuantity());
            product.setImageUrl(productRequest.getImageUrl());
            
            if (productRequest.getCategory() != null && productRequest.getCategory().getId() != null) {
                 Optional<Category> category = categoryRepository.findById(productRequest.getCategory().getId());
                 if (category.isPresent()) {
                     product.setCategory(category.get());
                 }
            }
            
            productRepository.save(product);
            return ResponseEntity.ok(new MessageResponse("Product updated successfully!"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        try {
            productRepository.deleteById(id);
            return ResponseEntity.ok(new MessageResponse("Product deleted successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error deleting product"));
        }
    }
}
