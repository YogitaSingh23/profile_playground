package com.example.profileplayground.controller;

import com.example.profileplayground.model.Profile;
import com.example.profileplayground.model.Project;
import com.example.profileplayground.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfileController {
    private final ProfileService profileService;
    public ProfileController(ProfileService profileService) { this.profileService = profileService; }
    @GetMapping("/health")
    public String health() { return "OK"; }
    @PostMapping("/profiles")
    public Profile createProfile(@RequestBody Profile profile) { return profileService.create(profile); }
    @GetMapping("/profiles")
    public List<Profile> getAllProfiles() { return profileService.all(); }
    @GetMapping("/profiles/{id}")
    public ResponseEntity<Profile> getProfile(@PathVariable Long id) {
        return profileService.byId(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    @PutMapping("/profiles/{id}")
    public Profile updateProfile(@PathVariable Long id, @RequestBody Profile profile) { return profileService.update(id, profile); }
    @GetMapping("/projects")
    public List<Project> getProjectsBySkill(@RequestParam(name="skill", required=false) String skill) {
        if (skill == null || skill.isBlank()) return List.of();
        return profileService.projectsBySkill(skill);
    }
    @GetMapping("/skills/top")
    public List<String> getTopSkills() { return profileService.topSkills(); }
    @GetMapping("/search")
    public List<Profile> search(@RequestParam(name="q", required=false) String q) {
        if (q == null || q.isBlank()) return profileService.all();
        return profileService.search(q);
    }
}
