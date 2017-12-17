package com.concretepage.dao.impl;

import java.util.Calendar;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import org.springframework.stereotype.Repository;

import com.concretepage.dao.IProjectDAO;
import com.concretepage.entity.Project;
import com.concretepage.entity.Status;

@Transactional
@Repository
public class ProjectDAOImpl implements IProjectDAO {
	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<Project> getProjects() {
		String hql = "FROM Project as prg where prg.status = '" + Status.Active.toString() + "'  Order by prg.projectName";
		return entityManager.createQuery(hql).getResultList();	
		/*CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		 CriteriaQuery<Project> criteria = cb.createQuery(Project.class);
		 Root<Project> root = criteria.from(Project.class);
		 criteria.select(root);
		 criteria.orderBy(cb.asc(root.get("projectName")));
		 return entityManager.createQuery(criteria).getResultList();
		 */
	}

	@Override
	public List<Project> findProjectByName(String projectName) {
		
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Project> criteria = cb.createQuery(Project.class);
		Root<Project> root = criteria.from(Project.class);
		criteria.select(root);
		criteria.where(cb.like(root.get("projectName"), projectName));
		criteria.where(cb.equal(root.get("status"), Status.Active.toString()));
		return entityManager.createQuery(criteria).getResultList();
	}

	@Override
	public void update(Project project) {
		String hql = "update Project p set p.projectName = ? , p.customer.customerId = ? , p.customerProgram.customerProgramId = ?, p.department.departmentId = ? , p.projectType = ? , p.projectStatus = ? , p.updatedTime = ? , location = ?, customerProjectCode = ? , projectCode = ?  where projectid = ?";
		Query query = entityManager.createQuery(hql);
		query.setParameter(1, project.getProjectName());
		query.setParameter(2, project.getCustomer().getCustomerId());
		query.setParameter(3, project.getCustomerProgram().getCustomerProgramId());
		query.setParameter(4, project.getDepartment().getDepartmentId());
		query.setParameter(5, project.getProjectType());
		query.setParameter(6, project.getProjectStatus());
		query.setParameter(7, Calendar.getInstance().getTime());
		query.setParameter(8, project.getLocation());
		query.setParameter(9, project.getCustomerProjectCode());
		query.setParameter(10, project.getProjectCode());
		query.setParameter(11, project.getProjectid());
		
		query.executeUpdate();
	}

	@Override
	public void create(Project project) {
		entityManager.persist(project);
	}

	@Override
	public void delete(Integer projectId) {
		String hql = "update Project p set p.status = '" + Status.Inactive.toString() + "'  where p.projectid = ? ";
		Query query = entityManager.createQuery(hql);
		query.setParameter(1, projectId);
		query.executeUpdate();
	}

	@Override
	public Project findProjectById(Integer projectId) {
	
		return entityManager.find(Project.class, projectId);
	}

	@Override
	public List<Project> findProjectForCustomerAndDepartment(Integer customerId,
			Integer departmentId) {
		String hql = "from Project t where t.customer.customerId = ? and t.department.departmentId = ?  and t.status = '"+  Status.Active.toString() + "' order by t.projectName";
		Query query = entityManager.createQuery(hql);
		query.setParameter(1, customerId);
		query.setParameter(2, departmentId);
		return query.getResultList();
		
	}

}
