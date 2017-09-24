using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Dynappix.Bastogne.Models
{
    public partial class BastogneContext : DbContext
    {
        public virtual DbSet<Control> Control { get; set; }
        public virtual DbSet<ControlDefinition> ControlDefinition { get; set; }
        public virtual DbSet<Event> Event { get; set; }
        public virtual DbSet<Organisation> Organisation { get; set; }
        public virtual DbSet<PartialForm> PartialForm { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<Rule> Rule { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<SchemaVersions> SchemaVersions { get; set; }
        public virtual DbSet<UserRole> UserRole { get; set; }


        public BastogneContext(DbContextOptions<BastogneContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Control>(entity =>
            {
                entity.Property(e => e.ControlId).HasDefaultValueSql("newid()");

                entity.Property(e => e.ControlTypeId).HasColumnType("nchar(50)");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.CreatedId).HasMaxLength(200);

                entity.Property(e => e.Name).HasColumnType("nchar(200)");

                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.Property(e => e.UpdatedId).HasMaxLength(200);

                entity.HasOne(d => d.ParentControl)
                    .WithMany(p => p.InverseParentControl)
                    .HasForeignKey(d => d.ParentControlId)
                    .HasConstraintName("FK__Control__ParentC__2B3F6F97");

                entity.HasOne(d => d.Partial)
                    .WithMany(p => p.Control)
                    .HasForeignKey(d => d.PartialId)
                    .HasConstraintName("FK_Control_PartialId");
            });

            modelBuilder.Entity<ControlDefinition>(entity =>
            {
                entity.HasKey(e => e.ControlTypeId)
                    .HasName("PK__ControlD__3399DDEBE68CFD9A");

                entity.Property(e => e.ControlTypeId).HasDefaultValueSql("newid()");

                entity.Property(e => e.Catagory).HasMaxLength(200);

                entity.Property(e => e.ComponentName).HasMaxLength(200);

                entity.Property(e => e.ControlName).HasMaxLength(500);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.CreatedId).HasMaxLength(500);

                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.Property(e => e.UpdatedId).HasMaxLength(500);
            });

            modelBuilder.Entity<Event>(entity =>
            {
                entity.Property(e => e.EventId).HasDefaultValueSql("newid()");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.CreatedId).HasMaxLength(200);

                entity.Property(e => e.EventName).HasMaxLength(500);

                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.Property(e => e.UpdatedId).HasMaxLength(200);

                entity.HasOne(d => d.Partial)
                    .WithMany(p => p.Event)
                    .HasForeignKey(d => d.PartialId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Event_PartialId");
            });

            modelBuilder.Entity<PartialForm>(entity =>
            {
                entity.HasKey(e => e.PartialId)
                    .HasName("PK__PartialF__2004BDB1EAC5EC3C");

                entity.Property(e => e.PartialId).HasDefaultValueSql("newid()");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.CreatedId).HasMaxLength(50);

                entity.Property(e => e.Name).HasMaxLength(200);

                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.Property(e => e.UpdatedId).HasMaxLength(50);

                entity.Property(e => e.Version).HasColumnType("nchar(10)");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.Id).HasDefaultValueSql("newid()");

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<Rule>(entity =>
            {
                entity.Property(e => e.RuleId).HasDefaultValueSql("newid()");

                entity.Property(e => e.CreatedDate).HasColumnType("nchar(10)");

                entity.Property(e => e.CreatedId).HasColumnType("nchar(10)");

                entity.Property(e => e.TriggerComponentId).HasMaxLength(200);

                entity.Property(e => e.TriggerFunctionId).HasMaxLength(200);

                entity.Property(e => e.UpdatedDate).HasColumnType("nchar(10)");

                entity.Property(e => e.UpdatedId).HasColumnType("nchar(10)");

                entity.HasOne(d => d.Event)
                    .WithMany(p => p.Rule)
                    .HasForeignKey(d => d.EventId)
                    .HasConstraintName("FK_Rule_EventId");
            });

            modelBuilder.Entity<SchemaVersions>(entity =>
            {
                entity.Property(e => e.Applied).HasColumnType("datetime");

                entity.Property(e => e.ScriptName)
                    .IsRequired()
                    .HasMaxLength(255);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Avatar).HasMaxLength(255);

                entity.Property(e => e.Created).HasColumnType("datetime");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.FirstName).HasMaxLength(50);

                entity.Property(e => e.LastName).HasMaxLength(50);

                entity.Property(e => e.PreferredLang).HasColumnType("nchar(10)");

                entity.Property(e => e.Provider).HasMaxLength(50);

                entity.HasOne(d => d.OrganisationNavigation)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.Organisation)
                    .HasConstraintName("FK_User_Organisation");
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.UserRole)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FK_RoleId_Role");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserRole)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_UserId_User");
            });
        }
    }
}