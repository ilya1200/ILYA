select pid
from project
where not exists (
	(select eid
	from employee
	where did=7)
	except
	(select eid
	from onproject
	where onproject.pid=project.pid)
);