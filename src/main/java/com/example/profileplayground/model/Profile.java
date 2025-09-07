package com.example.profileplayground.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String education;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Skill> skills;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Project> projects;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<WorkExperience> work;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Link> links;
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }
    public List<Skill> getSkills() { return skills; }
    public void setSkills(List<Skill> skills) { this.skills = skills; }
    public List<Project> getProjects() { return projects; }
    public void setProjects(List<Project> projects) { this.projects = projects; }
    public List<WorkExperience> getWork() { return work; }
    public void setWork(List<WorkExperience> work) { this.work = work; }
    public List<Link> getLinks() { return links; }
    public void setLinks(List<Link> links) { this.links = links; }
}
