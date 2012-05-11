package todo;

import javax.inject.Inject;
import org.resthub.web.controller.RepositoryBasedRestController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller @RequestMapping("/api/todo")
public class TodoController extends RepositoryBasedRestController<Todo, String, TodoRepository> {

    @Inject
    @Override
    public void setRepository(TodoRepository repository) {
        this.repository = repository;
    }

    @Override
    public String getIdFromResource(Todo resource) {
        return resource.getId();
    }
    
}
