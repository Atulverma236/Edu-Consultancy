package com.infosys.educationConsultancyApplication.dao;

import java.util.List;

import com.infosys.educationConsultancyApplication.bean.Payment;

public interface PaymentDao {
	public void save(Payment payment);
	public Payment getPaymentByBill(String billNumber);
	public List<Payment> getAllBills();
	public List<Payment> getBillByStudentId(String studentId);
	List<Payment> getBillBySubscriptionId(String subscriptionId);
	public String generateBillNumber();
	public Integer getMaxInstallmentNumber(String subscriptionId);
	

}
