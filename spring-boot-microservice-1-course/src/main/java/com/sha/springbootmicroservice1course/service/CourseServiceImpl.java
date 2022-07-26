package com.sha.springbootmicroservice1course.service;

import com.sha.springbootmicroservice1course.model.Course;
import com.sha.springbootmicroservice1course.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.time.LocalDateTime.now;

@Service
public class CourseServiceImpl implements CourseService {
    private final CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public Course saveCourse(Course course) {
        course.setCreateTime(now());
        return courseRepository.save(course);
    }

    @Override
    public void deleteCourse(Long courseId) {
        courseRepository.deleteById(courseId);
    }

    @Override
    public List<Course> findAllCourses() {
        return courseRepository.findAll();
    }
}
