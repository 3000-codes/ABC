package com.demo.servlet;

import javax.servlet.*;
import java.io.IOException;

public class Hello implements Servlet {
    @Override
    public void init(ServletConfig servletConfig) throws ServletException {
        // String username = servletConfig.getInitParameter("username");
        // System.out.println("username=" + username);
        ServletContext servletContext = servletConfig.getServletContext();
        String contextPath = servletContext.getContextPath();
        System.out.println("项目路径=" + contextPath);
        String realPath = servletContext.getRealPath("index.html");
        System.out.println("index.html的真实路径=" + realPath);
    }

    @Override
    public ServletConfig getServletConfig() {
        return null;
    }

    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse)
            throws ServletException, IOException {
        System.out.println("[Hello] service() is called.");
    }

    @Override
    public String getServletInfo() {
        return null;
    }

    @Override
    public void destroy() {

    }
}
