GO
PRINT N'Altering [dbo].[Rule]...';


GO
ALTER TABLE [dbo].[Rule]
    ADD [RuleSettings] NVARCHAR (MAX) NULL;


GO
