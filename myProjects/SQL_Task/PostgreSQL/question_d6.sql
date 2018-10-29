select did
from employee natural join department
where floor=3 and salary is not null
group by did
having avg(salary)> all(select salary from employee where classification=1);