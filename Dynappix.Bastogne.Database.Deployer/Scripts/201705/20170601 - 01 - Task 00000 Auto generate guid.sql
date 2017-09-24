GO
PRINT N'Creating [dbo].[Control]...';


GO
CREATE TABLE [dbo].[Control] (
    [ControlId]       UNIQUEIDENTIFIER NOT NULL,
    [CreatedDate]     DATETIME         NULL,
    [CreatedId]       NVARCHAR (200)   NULL,
    [UpdatedDate]     DATETIME         NULL,
    [UpdatedId]       NVARCHAR (200)   NULL,
    [Name]            NCHAR (200)      NULL,
    [Settings]        NVARCHAR (MAX)   NULL,
    [ControlTypeId]   NCHAR (10)       NULL,
    [PartialId]       UNIQUEIDENTIFIER NULL,
    [ParentControlId] UNIQUEIDENTIFIER NULL,
    PRIMARY KEY CLUSTERED ([ControlId] ASC)
);


GO
PRINT N'Creating [dbo].[PartialForm]...';


GO
CREATE TABLE [dbo].[PartialForm] (
    [PartialId]   UNIQUEIDENTIFIER NOT NULL,
    [RowId]       UNIQUEIDENTIFIER NULL,
    [CreatedDate] DATETIME         NULL,
    [CreatedId]   NVARCHAR (50)    NULL,
    [UpdatedDate] DATETIME         NULL,
    [UpdatedId]   NVARCHAR (50)    NULL,
    [Name]        NVARCHAR (200)   NULL,
    [Settings]    NVARCHAR (MAX)   NULL,
    PRIMARY KEY CLUSTERED ([PartialId] ASC)
);


GO
PRINT N'Creating [dbo].[SchemaVersions]...';


GO
CREATE TABLE [dbo].[SchemaVersions] (
    [Id]         INT            IDENTITY (1, 1) NOT NULL,
    [ScriptName] NVARCHAR (255) NOT NULL,
    [Applied]    DATETIME       NOT NULL,
    CONSTRAINT [PK_SchemaVersions_Id] PRIMARY KEY CLUSTERED ([Id] ASC) ON [PRIMARY]
) ON [PRIMARY];


GO
PRINT N'Creating unnamed constraint on [dbo].[Control]...';


GO
ALTER TABLE [dbo].[Control]
    ADD DEFAULT newid() FOR [ControlId];


GO
PRINT N'Creating unnamed constraint on [dbo].[PartialForm]...';


GO
ALTER TABLE [dbo].[PartialForm]
    ADD DEFAULT newid() FOR [PartialId];


GO
PRINT N'Creating [dbo].[FK_Control_PartialId]...';


GO
ALTER TABLE [dbo].[Control] WITH NOCHECK
    ADD CONSTRAINT [FK_Control_PartialId] FOREIGN KEY ([PartialId]) REFERENCES [dbo].[PartialForm] ([PartialId]);


GO
PRINT N'Creating [dbo].[FK_Control_Control]...';


GO
ALTER TABLE [dbo].[Control] WITH NOCHECK
    ADD CONSTRAINT [FK_Control_Control] FOREIGN KEY ([ParentControlId]) REFERENCES [dbo].[Control] ([ControlId]);


GO
