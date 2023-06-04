import com.ethan.pan.Job;
import com.ethan.pan.Utils;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello");
        // job_id,job_title,min_salary,max_salary
        String sql = "select job_id as jobId, job_title as jobTitle, min_salary as minSalary, max_salary as maxSalary from jobs limit 0, 10";
        Job[] jobs = Utils.query(Job.class, sql);
//        for (Job job : jobs) {
//            System.out.println(job);
//        }
    }
}
