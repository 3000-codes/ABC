package com.ethan.pan;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.junit.Test;

public class PreparedStatementTest {
  @Test
  public void insetTest() {
    Connection conn = null;
    PreparedStatement prepareStatement = null;
    try {
      conn = Utils.connect2SQL();
      String sql = "insert into jobs(job_id,job_title,min_salary,max_salary) values(?,?,?,?)";
      prepareStatement = conn.prepareStatement(sql);
      prepareStatement.setString(1, "P1");
      prepareStatement.setString(2, "Programmer");
      prepareStatement.setInt(3, 10000);
      prepareStatement.setInt(4, 20000);
      // 增删改统一用executeUpdate,返回值是影响的行数
      int executeUpdate = prepareStatement.executeUpdate();
      System.out.println(executeUpdate);
    } catch (Exception e) {
      e.printStackTrace();
    }
    Utils.closeConnection(conn, prepareStatement, null);
  }

  @Test
  public void updateTest() {
    Connection conn = null;
    PreparedStatement prepareStatement = null;
    try {
      conn = Utils.connect2SQL();
      String sql = "update jobs set min_salary = ? where job_id = ?";
      prepareStatement = conn.prepareStatement(sql);
      prepareStatement.setInt(1, 20000);
      prepareStatement.setString(2, "P1");
      int executeUpdate = prepareStatement.executeUpdate();
      System.out.println(executeUpdate);
    } catch (Exception e) {
      e.printStackTrace();
    }
    Utils.closeConnection(conn, prepareStatement, null);
  }

  @Test
  public void deleteTest() {
    Connection conn = null;
    PreparedStatement prepareStatement = null;
    try {
      conn = Utils.connect2SQL();
      String sql = "delete from jobs where job_id = ?";
      prepareStatement = conn.prepareStatement(sql);
      prepareStatement.setString(1, "P1");
      int executeUpdate = prepareStatement.executeUpdate();
      System.out.println(executeUpdate);
    } catch (Exception e) {
      e.printStackTrace();
    }
    Utils.closeConnection(conn, prepareStatement, null);
  }

  @Test
  public void selectTest() {
    Connection conn = null;
    PreparedStatement prepareStatement = null;
    ResultSet rs = null;
    try {
      conn = Utils.connect2SQL();
      String sql = "select * from jobs where job_id = ?";
      prepareStatement = conn.prepareStatement(sql);
      prepareStatement.setString(1, "P1");
      rs = prepareStatement.executeQuery();
      while (rs.next()) {
        System.out.println(rs.getString("job_id"));
        System.out.println(rs.getString("job_title"));
        System.out.println(rs.getInt("min_salary"));
        System.out.println(rs.getInt("max_salary"));
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    Utils.closeConnection(conn, prepareStatement, rs);
  }

  // @Test
  // public Job[] queryJobs() {
  // Connection conn = null;
  // PreparedStatement prepareStatement = null;
  // ResultSet rs = null;
  // try {
  // conn = Utils.connect2SQL();
  // String sql = "select * from jobs limit 0, 10";
  // prepareStatement = conn.prepareStatement(sql);
  // rs = prepareStatement.executeQuery();
  // Job[] jobs = new Job[10];
  // int i = 0;
  // while (rs.next()) {
  // String jobId = rs.getString("job_id");
  // String jobTitle = rs.getString("job_title");
  // int minSalary = rs.getInt("min_salary");
  // int maxSalary = rs.getInt("max_salary");
  // Job job = new Job(jobId, jobTitle, minSalary, maxSalary);
  // jobs[i++] = job;
  // }
  // return jobs;
  // } catch (Exception e) {
  // e.printStackTrace();
  // }
  // Utils.closeConnection(conn, prepareStatement, rs);
  // return null;
  // }

  @Test
  public void batchInsert() {
    Connection conn = null;
    PreparedStatement prepareStatement = null;
    try {
      String sql = "insert into dept1(id,name) values(?,?)";
      conn = Utils.connect2SQL();
      prepareStatement = conn.prepareStatement(sql);

      for (int i = 1; i <= 10000; i++) {
        prepareStatement.setInt(1, i);
        prepareStatement.setString(2, "name_" + i);
        prepareStatement.addBatch();
        if (i % 1000 == 0) { // 每1000条执行一次
          prepareStatement.executeBatch();
          prepareStatement.clearBatch();
        }
      }
//      prepareStatement.executeBatch();
    } catch (Exception e) {
      e.printStackTrace();
    }
    Utils.closeConnection(conn, prepareStatement, null);
  }

  @Test
  public void util_updateTest() {
    String sql = "insert into jobs(job_id,job_title,min_salary,max_salary) values(?,?,?,?)";
    int update = Utils.update(sql, "P1", "Programmer", 10000, 20000);
    System.out.println(update);
  }
}
