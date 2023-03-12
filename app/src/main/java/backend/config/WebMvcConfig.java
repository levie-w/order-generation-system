package backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@Configuration
@ComponentScan(basePackages = {"backend.controller"})
public class WebMvcConfig extends WebMvcConfigurationSupport {
    private static final String WEB_JAR_RESOURCE_LOCATION = "classpath:META-INF/resources/";

    @Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("css/**", "js/**", "lib/**", "images/**", "fonts/**")
                .addResourceLocations(
                        WEB_JAR_RESOURCE_LOCATION,
                        WEB_JAR_RESOURCE_LOCATION + "css/",
                        WEB_JAR_RESOURCE_LOCATION + "js/",
                        WEB_JAR_RESOURCE_LOCATION + "lib/",
                        WEB_JAR_RESOURCE_LOCATION + "images/",
                        WEB_JAR_RESOURCE_LOCATION + "fonts/"
                )
                .setCachePeriod(0);

        registry.addResourceHandler("webjars/**")
                .addResourceLocations(WEB_JAR_RESOURCE_LOCATION + "webjars/")
                .setCachePeriod(0);

        registry.addResourceHandler("index.html")
                .addResourceLocations("classpath:/index.html");

        registry.addResourceHandler("static/**")
                .addResourceLocations("classpath:/static/");

        registry.addResourceHandler("manifest.json")
                .addResourceLocations("classpath:/manifest.json");

        registry.addResourceHandler("favicon.ico")
                .addResourceLocations("classpath:/favicon.ico");

        super.addResourceHandlers(registry);
    }

    @Bean
    public MultipartResolver multipartResolver () {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setMaxInMemorySize(10485760); // 10MB
        return multipartResolver;
    }
}
