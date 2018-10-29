select d.dname
from department as d
where d.floor=3 and 
not exists 
(select *
from employee as e
where d.did=e.did and e.classification=4
);