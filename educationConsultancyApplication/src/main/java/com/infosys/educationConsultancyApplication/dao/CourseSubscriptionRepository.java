package com.infosys.educationConsultancyApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.infosys.educationConsultancyApplication.bean.CourseSubscription;

public interface CourseSubscriptionRepository extends JpaRepository<CourseSubscription, String> {
	
	@Query("SELECT max(subscriptionId) from CourseSubscription")
	public String getMaxId();

	@Query("select a from CourseSubscription a where a.status='active'")
	public List<CourseSubscription> getCurrentSubscriptions();
	
	@Query("select a from CourseSubscription a where studentId=?1")
	public List<CourseSubscription>getAllSubscriptionsByStudentId(String studentId );
	
	@Query("select status from CourseSubscription a where studentId=?1")
	public String getStatusBySubscriptionId(String subscriptionId);
	
	@Query("select status from CourseSubscription where courseId=?1 and studentId=?2")
	public String getStatusByCourseIdStudentId(Long courseId,String studentId);

}
