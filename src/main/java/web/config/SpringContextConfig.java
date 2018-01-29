package web.config;



import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;



@Configuration
@ComponentScan(basePackageClasses = {
		web.messagesources.PackageMarker.class,
		web.service.DummyService.class,
})
@Import({
		web.config.DatabasConfig.class,
		web.config.MessageSourceConfig.class,
		web.config.PropertySourceConfig.class,
})
public class SpringContextConfig {
}
