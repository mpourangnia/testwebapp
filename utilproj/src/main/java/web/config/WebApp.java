package web.config;



import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;



public class WebApp extends AbstractAnnotationConfigDispatcherServletInitializer {

	@Override
	protected Class<?>[] getRootConfigClasses() {
		return new Class<?>[]{ SpringContextConfig.class };
	}



	@Override
	protected Class<?>[] getServletConfigClasses() {
		return new Class<?>[]{ MvcConfig.class };
	}



	@Override
	protected String[] getServletMappings() {
		return new String[]{ "/spring/*" };
	}
}
