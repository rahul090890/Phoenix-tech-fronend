package com.concretepage.entity;

public enum Status {
	Active("Y"),
	Inactive("N");
	
	private final String statusValue;
	
	private Status(String status) {
		this.statusValue = status;
	}
	public String toString() {
		return this.statusValue;
	}
	
	public static void main(String[] args) {
		System.out.println(Status.Active.statusValue);
	}
	
}
