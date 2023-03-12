package backend.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Levie Wang
 * @since 2023.03.10
 */
@RestController
public class HelloController {

    @RequestMapping("/hello")
    public String hello(Model model) {
        model.addAttribute("projectName", "Order Generation System");
        model.addAttribute("env", System.getProperty("spring.profiles.active"));
        return "hello";
    }
}
