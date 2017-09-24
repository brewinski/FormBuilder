using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Dynappix.Bastogne.API.Models
{
    public partial class BastogneContext : DbContext
    {
        public virtual DbSet<Control> Control { get; set; }
        public virtual DbSet<PartialForm> PartialForm { get; set; }
        public virtual DbSet<SchemaVersions> SchemaVersions { get; set; }

        public BastogneContext(DbContextOptions<BastogneContext> options)
        : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Control>(entity =>
            {
                entity.Property(e => e.ControlId).HasDefaultValueSql("newid()");

                entity.Property(e => e.ControlTypeId).HasColumnType("nchar(10)");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.CreatedId).HasMaxLength(200);

                entity.Property(e => e.Name).HasColumnType("nchar(200)");

                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.Property(e => e.UpdatedId).HasMaxLength(200);

                entity.HasOne(d => d.ParentControl)
                    .WithMany(p => p.InverseParentControl)
                    .HasForeignKey(d => d.ParentControlId)
                    .HasConstraintName("FK__Control__ParentC__34C8D9D1");

                entity.HasOne(d => d.Partial)
                    .WithMany(p => p.Control)
                    .HasForeignKey(d => d.PartialId)
                    .HasConstraintName("FK_Control_PartialId");

                //entity.Property(e => e._Settings);
            });

            modelBuilder.Entity<PartialForm>(entity =>
            {
                entity.HasKey(e => e.PartialId)
                    .HasName("PK__PartialF__2004BDB19EA89544");

                entity.Property(e => e.PartialId).HasDefaultValueSql("newid()");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.CreatedId).HasMaxLength(50);

                entity.Property(e => e.Name).HasMaxLength(200);

                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.Property(e => e.UpdatedId).HasMaxLength(50);
            });

            modelBuilder.Entity<SchemaVersions>(entity =>
            {
                entity.Property(e => e.Applied).HasColumnType("datetime");

                entity.Property(e => e.ScriptName)
                    .IsRequired()
                    .HasMaxLength(255);
            });
        }
    }
}