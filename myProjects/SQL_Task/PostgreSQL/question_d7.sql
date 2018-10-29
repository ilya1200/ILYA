select abs(avg(e1.salary) - avg(e2.salary))
from employee e1, (select * from employee where classification=2 and salary is not NULL) e2
where e1.classification <> 2 and e1.salary is not NULL