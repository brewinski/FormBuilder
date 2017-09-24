GO
PRINT N'Creating unnamed constraint on [dbo].[Event]...';


GO
ALTER TABLE [dbo].[Event]
    ADD DEFAULT newid() FOR [EventId];


GO
PRINT N'Creating unnamed constraint on [dbo].[Rule]...';


GO
ALTER TABLE [dbo].[Rule]
    ADD DEFAULT newid() FOR [RuleId];


GO
-- Refactoring step to update target server with deployed transaction logs
