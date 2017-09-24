GO
PRINT N'Altering [dbo].[PartialForm]...';


GO
ALTER TABLE [dbo].[PartialForm]
    ADD [Version] NCHAR (10) NULL;


GO
PRINT N'Creating [dbo].[ControlDefinition]...';


GO
CREATE TABLE [dbo].[ControlDefinition] (
    [ControlTypeId] UNIQUEIDENTIFIER NOT NULL,
    [CreatedDate]   DATETIME         NULL,
    [CreatedId]     NVARCHAR (500)   NULL,
    [UpdatedDate]   DATETIME         NULL,
    [UpdatedId]     NVARCHAR (500)   NULL,
    [Catagory]      NVARCHAR (200)   NULL,
    [ComponentName] NVARCHAR (200)   NULL,
    [Description]   NVARCHAR (MAX)   NULL,
    [ControlName]   NVARCHAR (500)   NULL,
    PRIMARY KEY CLUSTERED ([ControlTypeId] ASC)
);


GO
PRINT N'Creating unnamed constraint on [dbo].[ControlDefinition]...';


GO
ALTER TABLE [dbo].[ControlDefinition]
    ADD DEFAULT newid() FOR [ControlTypeId];


GO
PRINT N'Creating [dbo].[FK_Event_ControlId]...';


GO
ALTER TABLE [dbo].[Event] WITH NOCHECK
    ADD CONSTRAINT [FK_Event_ControlId] FOREIGN KEY ([ControlId]) REFERENCES [dbo].[Control] ([ControlId]);


GO
