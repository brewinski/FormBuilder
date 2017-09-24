PRINT N'Altering [dbo].[User]...';
GO

ALTER TABLE [dbo].[User]
    ADD [Organisation] UNIQUEIDENTIFIER NULL,
        [Provider]     NVARCHAR (50)    NULL;
GO

PRINT N'Creating [dbo].[Organisation]...';
GO

CREATE TABLE [dbo].[Organisation] (
    [Id]                  UNIQUEIDENTIFIER NOT NULL,
    [Name]                NVARCHAR (200)   NULL,
    [PrimaryContactName]  NVARCHAR (200)   NULL,
    [PrimaryContactEmail] NVARCHAR (200)   NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

PRINT N'Creating [dbo].[Role]...';
GO

CREATE TABLE [dbo].[Role] (
    [Id]   UNIQUEIDENTIFIER NOT NULL,
    [Name] NVARCHAR (50)    NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

PRINT N'Creating [dbo].[UserRole]...';
GO

CREATE TABLE [dbo].[UserRole] (
    [Id]     INT              NOT NULL,
    [RoleId] UNIQUEIDENTIFIER NULL,
    [UserId] INT              NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

PRINT N'Creating unnamed constraint on [dbo].[Organisation]...';
GO

ALTER TABLE [dbo].[Organisation]
    ADD DEFAULT newid() FOR [Id];
GO

PRINT N'Creating unnamed constraint on [dbo].[Role]...';
GO

ALTER TABLE [dbo].[Role]
    ADD DEFAULT newid() FOR [Id];
GO

PRINT N'Creating [dbo].[FK_RoleId_Role]...';
GO

ALTER TABLE [dbo].[UserRole] WITH NOCHECK
    ADD CONSTRAINT [FK_RoleId_Role] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Role] ([Id]);
GO

PRINT N'Creating [dbo].[FK_UserId_User]...';
GO

ALTER TABLE [dbo].[UserRole] WITH NOCHECK
    ADD CONSTRAINT [FK_UserId_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([Id]);


GO
PRINT N'Creating [dbo].[FK_User_Organisation]...';


GO
ALTER TABLE [dbo].[User] WITH NOCHECK
    ADD CONSTRAINT [FK_User_Organisation] FOREIGN KEY ([Organisation]) REFERENCES [dbo].[Organisation] ([Id]);
GO

PRINT N'Update complete.';
GO
