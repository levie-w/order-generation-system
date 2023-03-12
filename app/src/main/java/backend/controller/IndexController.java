package backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

@Controller
public class IndexController {
    @RequestMapping(value = {"/", "/order/generate"}, method = RequestMethod.GET)
    public String getStaticResource(HttpServletRequest request) {
        return "forward:/index.html";
    }
}
