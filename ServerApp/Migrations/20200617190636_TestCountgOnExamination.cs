using Microsoft.EntityFrameworkCore.Migrations;

namespace Exam.Migrations
{
    public partial class TestCountgOnExamination : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ClosedTestCount",
                table: "Examinations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProgressTestCount",
                table: "Examinations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WaitingTestCount",
                table: "Examinations",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClosedTestCount",
                table: "Examinations");

            migrationBuilder.DropColumn(
                name: "ProgressTestCount",
                table: "Examinations");

            migrationBuilder.DropColumn(
                name: "WaitingTestCount",
                table: "Examinations");
        }
    }
}
