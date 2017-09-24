GO
PRINT N'Creating [dbo].[Event]...';


GO
CREATE TABLE [dbo].[Event] (
    [EventId]     UNIQUEIDENTIFIER NOT NULL,
    [EventName]   NVARCHAR (500)   NULL,
    [CreatedDate] DATETIME         NULL,
    [CreatedId]   NVARCHAR (200)   NULL,
    [UpdatedDate] DATETIME         NULL,
    [UpdatedId]   NVARCHAR (200)   NULL,
    PRIMARY KEY CLUSTERED ([EventId] ASC)
);


GO
PRINT N'Creating [dbo].[Rule]...';


GO
CREATE TABLE [dbo].[Rule] (
    [RuleId]             UNIQUEIDENTIFIER NOT NULL,
    [RuleName]           NVARCHAR (MAX)   NULL,
    [CreatedDate]        NCHAR (10)       NULL,
    [CreatedId]          NCHAR (10)       NULL,
    [UpdatedDate]        NCHAR (10)       NULL,
    [UpdatedId]          NCHAR (10)       NULL,
    [EventId]            UNIQUEIDENTIFIER NULL,
    [TriggerComponentId] NVARCHAR (200)   NULL,
    [TriggerFunctionId]  NVARCHAR (200)   NULL,
    PRIMARY KEY CLUSTERED ([RuleId] ASC)
);


GO
PRINT N'Creating [dbo].[FK_Rule_EventId]...';


GO
ALTER TABLE [dbo].[Rule] WITH NOCHECK
    ADD CONSTRAINT [FK_Rule_EventId] FOREIGN KEY ([EventId]) REFERENCES [dbo].[Event] ([EventId]);


GO
