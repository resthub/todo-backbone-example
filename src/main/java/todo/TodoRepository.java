package todo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Thanks to Spring Data, we just need to write the interface and use Spring Data query methods name. By parsing naming
 * by convention, it will generate automatically the implementation. More details in the Spring Data JPA
 * documentation at http://static.springsource.org/spring-data/data-jpa/docs/current/reference/html/
 */
public interface TodoRepository extends JpaRepository<Todo, String> {

    List<Todo> findByContentLike(String content);

}
