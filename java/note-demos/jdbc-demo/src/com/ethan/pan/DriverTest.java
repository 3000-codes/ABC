package com.ethan.pan;

import org.junit.Test;

import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
//import java.sql.SQLException;
import java.util.Properties;

public class DriverTest {
    @Test
    public void test1() throws Exception {
        String driveClassName = "com.mysql.cj.jdbc.Driver";
        Class<?> clazz = Class.forName(driveClassName);
        Driver driver = (Driver) clazz.newInstance();
        String url = "jdbc:mysql://127.0.0.1:3306/myemployees?serverTimezone=UTC";
        Properties auth = new Properties();
        auth.setProperty("user", "root");
        auth.setProperty("password", "123456");
        Connection conn = driver.connect(url, auth);
        System.out.println("conn = " + conn);
    }

    @Test
    public void test2() throws Exception {
        String driveClassName = "com.mysql.cj.jdbc.Driver";
        Class<?> clazz = Class.forName(driveClassName);
        Driver driver = (Driver) clazz.newInstance();

        // 注册驱动
        DriverManager.registerDriver(driver);
        String url = "jdbc:mysql://127.0.0.1:3306/myemployees?serverTimezone=UTC";
        String user = "root";
        String password = "123456";
        Connection conn = DriverManager.getConnection(url, user, password);
        System.out.println("conn = " + conn);
    }

    @Test
    public void test3() throws Exception {
        String driveClassName = "com.mysql.cj.jdbc.Driver";
        String url = "jdbc:mysql://127.0.0.1:3306/myemployees?serverTimezone=UTC";
        String user = "root";
        String password = "123456";
        // 自动加载驱动
        Class.forName(driveClassName); // 会执行静态代码块，自动注册驱动
        Connection conn = DriverManager.getConnection(url, user, password);
        System.out.println("conn = " + conn);
    }

    @Test
    public void test4() throws Exception {
        Properties jdbcProp = new Properties();
        jdbcProp.load(DriverTest.class.getClassLoader().getResourceAsStream("jdbc.properties"));
        // jdbcProp.load(new FileInputStream("src//jdbc.properties"));
        String driverClassName = jdbcProp.getProperty("driverClassName");
        String url = jdbcProp.getProperty("url");
        String user = jdbcProp.getProperty("user");
        String password = jdbcProp.getProperty("password");
        // 自动加载驱动
        Class.forName(driverClassName); // 会执行静态代码块，自动注册驱动
        Connection conn = DriverManager.getConnection(url, user, password);
        System.out.println("conn = " + conn);
    }
    @Test
    public void test5() throws Exception {
        Connection conn = Utils.connect2SQL();
        System.out.println("conn = " + conn);
    }
}
