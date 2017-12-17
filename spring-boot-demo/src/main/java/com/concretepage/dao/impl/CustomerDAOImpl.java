package com.concretepage.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.concretepage.dao.ICustomerDAO;
import com.concretepage.entity.Customer;
import com.concretepage.entity.Status;
import com.concretepage.exception.HRException;

@Transactional
@Repository
public class CustomerDAOImpl implements ICustomerDAO {

	@PersistenceContext
	private EntityManager entityManager;

	@SuppressWarnings("unchecked")
	@Override
	public List<Customer> getCustomers() {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Customer> criteria = cb.createQuery(Customer.class);
		Root<Customer> root = criteria.from(Customer.class);
		criteria.select(root);
		criteria.where(cb.equal(root.get("status"), Status.Active.toString()));
		criteria.orderBy(cb.asc(root.get("customerId")));
		return entityManager.createQuery(criteria).getResultList();
	}

	@Override
	public List<Customer> findByName(String customerName) {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Customer> criteria = cb.createQuery(Customer.class);
		Root<Customer> root = criteria.from(Customer.class);
		criteria.select(root);
		criteria.where(cb.equal(root.get("status"), Status.Active.toString()));
		criteria.where(cb.like(root.get("customerName"), "%" + customerName + "%"));
		return entityManager.createQuery(criteria).getResultList();
	}

	@Override
	public void update(Customer customer) {
		
		entityManager.merge(customer);
	}

	@Override
	public void create(Customer customer) {
		//entityManager.getTransaction().begin();
		entityManager.persist(customer);
		//entityManager.getTransaction().commit();
	}

	@Override
	public void delete(Customer customer) {
		customer = entityManager.find(Customer.class, customer.getCustomerId());
		customer.setStatus(Status.Inactive.toString());
		entityManager.persist(customer);
	}

	@Override
	public Customer findByCustomerId(Integer customerId) throws HRException {
		String hql = " FROM Customer as c where c.customerId = :customerId and c.status = '" + Status.Active.toString() + "'";
		Query query1 = entityManager.createQuery(hql);
		query1.setParameter("customerId", customerId);
		List<Customer> customers = (List<Customer>)query1.getResultList();
		if(null == customers || customers.size() == 0) {
			throw new HRException("Customer Id does not exits or InActive" + customerId);
		}
		return (Customer)(customers.get(0));
		
		
	}

}
