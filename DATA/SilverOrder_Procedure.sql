CREATE PROCEDURE P_PROC_DAILY_SALES
	@OrderDate DATE
AS
BEGIN
	MERGE INTO T_PROC_SALES AS target
	USING (
		SELECT
			A.STORE_ID,
			SUM(A.PAY_PRICE) AS 'PROC_DAILY_SALES'
		FROM T_ORDER A
		WHERE A.ORDER_DATE = @OrderDate
		AND A.ORDER_STATUS = 'ORDER_DONE'
		GROUP BY A.STORE_ID
	) AS source (STORE_ID, PROC_DAILY_SALES)
	ON (target.STORE_ID = source.STORE_ID AND target.PROC_DATE = @OrderDate)

	WHEN MATCHED THEN
		UPDATE SET
			target.PROC_DAILY_SALES = source.PROC_DAILY_SALES,
			target.INSERT_DATE = GETDATE()

	WHEN NOT MATCHED THEN
		INSERT (STORE_ID, PROC_DATE, PROC_DAILY_SALES, INSERT_DATE)
		VALUES (source.STORE_ID, @OrderDate, source.PROC_DAILY_SALES, GETDATE());
END;