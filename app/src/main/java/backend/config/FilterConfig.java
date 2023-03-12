package backend.config;

import backend.controller.filter.CorsFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.Filter;

@Configuration
public class FilterConfig {
    @Bean
    public FilterRegistrationBean someFilterRegistration() {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(corsFilter());
        // 设置url过滤器 匹配的url
        registration.addUrlPatterns("/*");
        // 名称
        registration.setName("corsFilter");
        // 多个filter 设置顺序 默认越小 代表调用顺序越靠前
        registration.setOrder(1);
        return registration;
    }

    @Bean
    public Filter corsFilter() {
        return new CorsFilter();
    }
}
