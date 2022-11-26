--
-- ASSETS INTERFACE
-- 

-- load all assets for "Computer Science" department
SELECT inv_number, cost, name, model
FROM Purchased_Asset
WHERE dept = "Computer Science";