package com.sha.springbootmicroservice3apigateway.request;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(value = "purchase-service", path = "api/purchase", configuration = FeignConfiguration.class)
public interface PurchaseServiceRequest {
    @PostMapping//api/purchase
    Object savePurchase(@RequestBody Object requestBody);

    @GetMapping("{userId}")//api/purchase/{userId}
    List<Object> getAllPurchasesOfUser(@PathVariable("userId") Long userId);
}