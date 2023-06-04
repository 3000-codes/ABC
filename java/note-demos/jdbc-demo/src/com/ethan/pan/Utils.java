package com.ethan.pan;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.sql.DataSource;

import com.alibaba.druid.pool.DruidDataSourceFactory;

public class Utils {
  public static Connection connect2SQL() throws Exception {
    Properties jdbcProp = new Properties();
    jdbcProp.load(Utils.class.getClassLoader().getResourceAsStream("jdbc.properties"));
    String driverClassName = jdbcProp.getProperty("driverClassName");
    String url = jdbcProp.getProperty("url");
    String user = jdbcProp.getProperty("user");
    String password = jdbcProp.getProperty("password");
    Class.forName(driverClassName);
    Connection conn = DriverManager.getConnection(url, user, password);
    return conn;
  }

  // FIXME：下面的方法有问题，待修复，提示类型转换错误
  public static <T> T[] query(Class<T> clazz, String sql, Object... args) {
    Connection conn = null;
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
      // 获取连接
      conn = Utils.connect2SQL();
      // 预编译 SQL 语句
      ps = conn.prepareStatement(sql);
      // 设置参数
      for (int i = 0; i < args.length; i++) {
        ps.setObject(i + 1, args[i]);
      }
      // 执行查询
      rs = ps.executeQuery();
      // 获取结果集的元数据
      ResultSetMetaData rsmd = rs.getMetaData();
      // 获取结果集的列数
      int columnCount = rsmd.getColumnCount();
      // 创建集合对象
      ArrayList<T> list = new ArrayList<>();
      // 处理结果集
      while (rs.next()) {
        // 获取一条记录的各个字段值
        // 创建 Map 集合
        Map<String, Object> map = new HashMap<>();
        // 处理结果集一行数据中的每一个字段
        for (int i = 0; i < columnCount; i++) {
          // 获取列值
          Object columnValue = rs.getObject(i + 1);
          // 获取列名:有别名则获取别名，没有则获取列名，必须保证 SQL 语句中的列名与实体类的属性名一致
          String columnLabel = rsmd.getColumnLabel(i + 1);
          // 把列名和列值放入 Map 集合中
          map.put(columnLabel, columnValue);
        }
        // 创建 Class 对应的对象
        T t = clazz.newInstance();
        // 遍历 Map 集合，给对象的属性赋值
        for (Map.Entry<String, Object> entry : map.entrySet()) {
          // 获取属性名
          String propertyName = entry.getKey();
          // 获取属性值
          Object propertyValue = entry.getValue();
          // 获取属性对应的 Field 对象
          Field field = clazz.getDeclaredField(propertyName);
          // 设置属性的访问权限
          field.setAccessible(true);
          // 给对象的属性赋值
          field.set(t, propertyValue);
        }
        // 把赋值后的对象添加到集合中
        list.add(t);
      }
      // 返回集合
      return (T[]) list.toArray();
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      // 关闭资源
      Utils.closeConnection(conn, ps, rs);
    }
    return null;
  }

  public static int update(String sql, Object... args) {
    Connection conn = null;
    PreparedStatement ps = null;
    try {
      conn = Utils.connect2SQL();
      ps = conn.prepareStatement(sql);
      for (int i = 0; i < args.length; i++) {
        ps.setObject(i + 1, args[i]);
      }
      return ps.executeUpdate();
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      Utils.closeConnection(conn, ps, null);
    }
    return 0;
  }

  public static void closeConnection(Connection conn, PreparedStatement ps, ResultSet rs) {
    if (rs != null) {
      try {
        rs.close();
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
    if (ps != null) {
      try {
        ps.close();
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
    if (conn != null) {
      try {
        conn.close();
      } catch (Exception e) {
        e.printStackTrace();
      }
    }
  }

  public static Connection connect2Datasource() throws Exception {
    Properties jdbcProp = new Properties();
    jdbcProp.load(Utils.class.getClassLoader().getResourceAsStream("druid.properties"));
    DataSource dataSource = DruidDataSourceFactory.createDataSource(jdbcProp);
    return dataSource.getConnection();
  }
}
