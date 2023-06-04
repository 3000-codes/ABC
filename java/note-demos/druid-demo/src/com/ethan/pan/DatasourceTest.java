package com.ethan.pan;

import java.util.Properties;

import javax.sql.DataSource;

import org.junit.Test;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.pool.DruidDataSourceFactory;

public class DatasourceTest {
  @Test
  public void dataSourceTest1() throws Exception {
    DruidDataSource dataSource = new DruidDataSource();
    Properties jdbcProp = new Properties();
    jdbcProp.load(Utils.class.getClassLoader().getResourceAsStream("jdbc.properties"));
    String driverClassName = jdbcProp.getProperty("driverClassName");
    String url = jdbcProp.getProperty("url");
    String user = jdbcProp.getProperty("user");
    String password = jdbcProp.getProperty("password");
    dataSource.setDriverClassName(driverClassName);
    dataSource.setUrl(url);
    dataSource.setUsername(user);
    dataSource.setPassword(password);
    System.out.println(dataSource.getConnection());
    // dataSource.setMaxActive(10); // 最大连接数
    // dataSource.setInitialSize(5); // 初始化连接数

  }

  @Test
  public void dataSourceTest2() throws Exception {
    Properties jdbcProp = new Properties();
    jdbcProp.load(DatasourceTest.class.getClassLoader().getResourceAsStream("druid.properties"));
    DataSource dataSource = DruidDataSourceFactory.createDataSource(jdbcProp);
    System.out.println(dataSource.getConnection());
    // dataSource.setMaxActive(10); // 最大连接数
    // dataSource.setInitialSize(5); // 初始化连接数

  }
}
