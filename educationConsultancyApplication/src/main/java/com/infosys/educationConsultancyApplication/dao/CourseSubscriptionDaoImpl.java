package com.infosys.educationConsultancyApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.infosys.educationConsultancyApplication.bean.CourseSubscription;
@Repository
public class CourseSubscriptionDaoImpl implements CourseSubscriptionDao {
	@Autowired
	private CourseSubscriptionRepository repository;
	
	@Autowired
	 public void save(CourseSubscription subscription) {
		 repository.save(subscription);
	}
	
	@Autowired
	public CourseSubscription getSubscriptionById(String id) {
		return repository.findById(id).get();
	}
	
	@Override
	 public List<CourseSubscription> getAllSubscriptions(){
		return repository.findAll();
	}

	@Override
	public List<CourseSubscription> getCurrentSubscriptions() {
	    return repository.getCurrentSubscriptions();
	}

	@Override
	public List<CourseSubscription> getAllSubscriptionsByStudent(String id) {
	    return repository.getAllSubscriptionsByStudentId(id);
	}

	@Override
	public String generateSubscriptionId() {
	    Long id = 0L;
	    String val = repository.getMaxId();
	    if (val == null)
	        id = 1000001L;
	    else {
	        id = Long.parseLong(val.substring(2));
	        id++;
	    }
	    String newId="CS"+ id;
	    return newId;
	}

}
