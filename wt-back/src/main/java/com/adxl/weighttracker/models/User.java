package com.adxl.weighttracker.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Document(collection="users")
public class User {

  @Id
  private String username;
  @NotNull
  private String password;

  private String name;

  private List<WeightEntry> entries;

  public User(String username,String password,String name) {
	this.username=username;
	this.password=password;
	this.name=name;
	entries=new ArrayList<>();
  }

  public String getUsername() {
	return username;
  }

  public String getPassword() {
	return password;
  }

  public String getName() {
	return name;
  }

  public List<WeightEntry> getEntries() {
	return entries;
  }

  public void addEntry(WeightEntry entry) {
	entries.add(entry);
  }

  public void deleteEntry(WeightEntry entry) {
	entries.remove(entry);
  }

  public void deleteEntry(int index) {
	entries.remove(index);
  }

  public WeightEntry editEntry(WeightEntry entry,WeightEntry newEntry) {
	var index=entries.indexOf(entry);
	entries.set(index,newEntry);

	return entry;
  }

  public WeightEntry editEntry(int index,WeightEntry newEntry) {
	var entry=entries.get(index);
	entries.set(index,newEntry);

	return entry;
  }

  public void clearEntries() {
	entries.clear();
  }

  @Override
  public String toString() {
	return "{username:'"+username+"',name'"+name+"',entries:"+entries.size()+"}";
  }
}
