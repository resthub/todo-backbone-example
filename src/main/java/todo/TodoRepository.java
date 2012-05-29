package todo;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Thanks to Spring Data, we just need to write the interface and use Spring Data query methods name. By parsing naming
 * by convention, it will generate automatically the implementation. More details in the Spring Data MongoDB
 * documentation at http://static.springsource.org/spring-data/data-mongodb/docs/current/reference/html/
 */
@Repository
public interface TodoRepository extends MongoRepository<Todo, String> {

    List<Todo> findByContentLike(String content);

}
