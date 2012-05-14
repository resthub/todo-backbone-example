package todo;

import javax.inject.Inject;
import org.resthub.common.util.PostInitialize;
import org.resthub.web.controller.RepositoryBasedRestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller @RequestMapping("/api/todo")
public class TodoController extends RepositoryBasedRestController<Todo, String, TodoRepository> {

    protected Logger logger = LoggerFactory.getLogger(TodoController.class);
    
    @PostInitialize
    public void init() {
        this.repository.save(new Todo("test123"));
    }
    
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
