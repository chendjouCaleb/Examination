using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Exam.Migrations
{
    public partial class WithSecretary : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Secretaries",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    RegisterUserId = table.Column<string>(nullable: true),
                    ExaminationId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Secretaries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Secretaries_Examinations_ExaminationId",
                        column: x => x.ExaminationId,
                        principalTable: "Examinations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Secretaries_ExaminationId",
                table: "Secretaries",
                column: "ExaminationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Secretaries");
        }
    }
}
