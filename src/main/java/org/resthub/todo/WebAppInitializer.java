package org.resthub.todo;


import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.XmlWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

public class WebAppInitializer implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
                
        XmlWebApplicationContext appContext = new XmlWebApplicationContext();

        ServletRegistration.Dynamic dispatcher = servletContext.addServlet("dispatcher", new DispatcherServlet(appContext));
        dispatcher.setLoadOnStartup(1);
        dispatcher.addMapping("/*");
        
        servletContext.addListener(new ContextLoaderListener(appContext));
        servletContext.setInitParameter("contextConfigLocation", "classpath*:resthubContext.xml classpath*:applicationContext.xml");

    }
}
