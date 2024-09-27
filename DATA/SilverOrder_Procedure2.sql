CREATE PROCEDURE P_PROC_AGE_MENU_SALES
	@OrderDate DATE
AS
BEGIN
	MERGE INTO T_PROC_AGE_MENU_SALES AS target
	USING (
		SELECT 
			A.STORE_ID,
			CASE 
				WHEN DATEDIFF(YEAR, D.USER_BIRTH, GETDATE()) / 10 * 10 <= 10 THEN 10
				WHEN DATEDIFF(YEAR, D.USER_BIRTH, GETDATE()) / 10 * 10 >= 60 THEN 60
				ELSE DATEDIFF(YEAR, D.USER_BIRTH, GETDATE()) / 10 * 10
			END AS PURCHASE_AGE,
			B.MENU_ID,
			SUM(B.MENU_AMOUNT) AS MENU_AMOUNT
		FROM T_ORDER A
		INNER JOIN T_ORDER_MENU B ON A.ORDER_ID = B.ORDER_ID
		INNER JOIN T_PAYMENT C ON A.PAYMENT_ID = C.PAYMENT_ID
		INNER JOIN T_USER D ON C.USER_ID = D.USER_ID
		WHERE A.ORDER_DATE = @OrderDate
		AND A.ORDER_STATUS = 'ORDER_DONE'
		GROUP BY A.STORE_ID, DATEDIFF(YEAR, D.USER_BIRTH, GETDATE()) / 10 * 10, B.MENU_ID
	) AS source (STORE_ID, PURCHASE_AGE, MENU_ID, MENU_AMOUNT)
	ON (target.STORE_ID = source.STORE_ID AND target.PROC_DATE = @OrderDate AND target.MENU_ID = source.MENU_ID 
	AND target.PURCHASE_AGE = source.PURCHASE_AGE)

	WHEN MATCHED THEN
		UPDATE SET
			target.PROC_MENU_AMOUNT = source.MENU_AMOUNT,
			target.INSERT_DATE = GETDATE()

	WHEN NOT MATCHED THEN
		INSERT (STORE_ID, PROC_DATE, MENU_ID, PURCHASE_AGE, PROC_MENU_AMOUNT, INSERT_DATE)
		VALUES (source.STORE_ID, @OrderDate, source.MENU_ID, source.PURCHASE_AGE, source.MENU_AMOUNT, GETDATE());
END;