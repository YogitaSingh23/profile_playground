package com.example.profileplayground.service;

import com.example.profileplayground.model.Profile;
import com.example.profileplayground.model.Project;
import com.example.profileplayground.repository.ProfileRepository;
import com.example.profileplayground.repository.ProjectRepository;
import com.example.profileplayground.repository.SkillRepository;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProfileService {
    private final ProfileRepository profileRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    public ProfileService(ProfileRepository profileRepository, ProjectRepository projectRepository, SkillRepository skillRepository) {
        this.profileRepository = profileRepository;
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
    }
    public Profile create(Profile profile) { return profileRepository.save(profile); }
    public List<Profile> all() { return profileRepository.findAll(); }
    public Optional<Profile> byId(Long id) { return profileRepository.findById(id); }
    public Profile update(Long id, Profile p) {
        return profileRepository.findById(id).map(existing -> {
            existing.setName(p.getName());
            existing.setEmail(p.getEmail());
            existing.setEducation(p.getEducation());
            existing.setSkills(p.getSkills());
            existing.setProjects(p.getProjects());
            existing.setWork(p.getWork());
            existing.setLinks(p.getLinks());
            return profileRepository.save(existing);
        }).orElseGet(() -> { p.setId(id); return profileRepository.save(p); });
    }
    public List<Project> projectsBySkill(String skill) {
        return projectRepository.findBySkillInText(skill.toLowerCase());
    }
    public List<String> topSkills() {
        List<String> names = skillRepository.findAllNames();
        Map<String, Long> counts = names.stream().collect(Collectors.groupingBy(s -> s.toLowerCase(), Collectors.counting()));
        return counts.entrySet().stream().sorted((a,b) -> Long.compare(b.getValue(), a.getValue())).map(Map.Entry::getKey).collect(Collectors.toList());
    }
    public List<Profile> search(String q) { return profileRepository.search(q); }
}
