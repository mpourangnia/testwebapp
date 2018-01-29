package web.config;



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jndi.JndiTemplate;
import web.properties.HassanProperties;

import javax.naming.NamingException;
import javax.sql.DataSource;



@Configuration
public class DatabasConfig {

	private final HassanProperties properties;



	public DatabasConfig(HassanProperties properties) {
		this.properties = properties;
	}



	@Bean
	public DataSource dataSource() throws NamingException {
		if (properties.getDatasourceJNDIName().isEmpty()) {
			return getDriverManagerDataSource();
		} else {
			return getJNDIDataSource();
		}
	}



	private DataSource getDriverManagerDataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName(properties.getDatasourceDriverClassName());
		dataSource.setUrl(properties.getDatasourceUrl());
		dataSource.setUsername(properties.getDatasourceUsername());
		dataSource.setPassword(properties.getDatasourcePassword());
		return dataSource;
	}



	private DataSource getJNDIDataSource() throws NamingException {
		JndiTemplate jndiTemplate = new JndiTemplate();
		return (DataSource)jndiTemplate.lookup(properties.getDatasourceJNDIName());
	}
}
